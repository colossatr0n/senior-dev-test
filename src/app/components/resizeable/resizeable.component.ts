import { NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';

/**
 * Resizeable component that projects content.
 */
@Component({
  selector: 'app-resizeable',
  imports: [NgStyle],
  templateUrl: './resizeable.component.html',
  styleUrl: './resizeable.component.scss'
})
export class ResizeableComponent {
    posX = 100 // x position of component (leftmost)
    posY = 100 // y position of component (topmost)
    width = 400 // component width
    height = 300 // component height
    lastClickX = 0 // last x position of event click
    lastClickY = 0 // last y position of event click
    isResizing = false // Triggered when resizing starts
    resizeStrats: Function[] = []; // Strategies for how to resize a particular side
    minDim = 100 // minimum allowed dimension

    /**
     * Triggered when the border is clicked. Sets state for resize operations.
     * @param event MouseEvent
     * @param resizeStrats The strategies to use for resizing
     */ 
    borderClicked(event: MouseEvent, resizeStrats: Function[]) {
        this.isResizing = true
        this.resizeStrats = resizeStrats
        this.lastClickX = event.clientX
        this.lastClickY = event.clientY
        event.preventDefault() // Stop events default behavior
        event.stopPropagation() // Stop the even from propagating to other events
    }

    /**
     * Resize component if isResizing is true and the mouse is moving.
     * Need to listen to document's mousemove so that the component still
     * resizes even if the mouse leaves the border boundary.
     * @param event MouseEvent
     * @returns 
     */
    @HostListener('document:mousemove', ['$event'])
    onResize(event: MouseEvent) {
        // Early return if not resizing (mouse just moving around)
        if (!this.isResizing) {
            return
        }
        // Set up restore vars
        let prevX = this.posX
        let prevY = this.posY
        let prevHeight = this.height
        let prevWidth = this.width

        let clickX = event.clientX
        let clickY = event.clientY
        // Calculate the difference between the previous mouse location and this one
        let diffX = clickX - this.lastClickX
        let diffY = clickY - this.lastClickY
        
        // Apply resize strategies to resize component
        for (let resizeStrat of this.resizeStrats) {
            resizeStrat.call(this, diffX, diffY)
        }

        // Restore previous state if current resize is illegal
        if (this.width < this.minDim || this.height < this.minDim) {
            this.posX = prevX
            this.posY = prevY
            this.height = prevHeight
            this.width = prevWidth
        }

        this.lastClickX = clickX
        this.lastClickY = clickY
    }

    /**
     * Stop resizing if the mouse is released anywhere on the document
     */
    @HostListener('document:mouseup', ['$event'])
    stopResize() {
        this.isResizing = false
    }

    /**
     * Resizes left side of component
     * @param diffX 
     * @param diffY 
     */
    resizeLeft(diffX: number, diffY: number) {
        this.posX += diffX
        this.width -= diffX
    }

    /**
     * Resizes right side of component
     * @param diffX 
     * @param diffY 
     */
    resizeRight(diffX: number, diffY: number) {
        this.width += diffX
    }

    /**
     * Resizes top side of component
     * @param diffX 
     * @param diffY 
     */
    resizeTop(diffX: number, diffY: number) {
        this.posY += diffY
        this.height -= diffY
    }

    /**
     * Resizes bottom side of component
     * @param diffX 
     * @param diffY 
     */
    resizeBottom(diffX: number, diffY: number) {
        this.height += diffY
    }
}
