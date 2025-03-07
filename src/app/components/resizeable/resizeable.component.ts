import { NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-resizeable',
  imports: [NgStyle],
  templateUrl: './resizeable.component.html',
  styleUrl: './resizeable.component.scss'
})
export class ResizeableComponent {
    posX = 100
    posY = 100
    width = 400
    height = 300
    lastClickX = 0
    lastClickY = 0
    isResizing = false
    resizeStrats: Function[] = [];
    minDim = 100

    borderClicked(event: MouseEvent, resizeStrats: Function[]) {
        this.isResizing = true
        this.resizeStrats = resizeStrats
        this.lastClickX = event.clientX
        this.lastClickY = event.clientY
        event.preventDefault()
        event.stopPropagation()
    }

    @HostListener('document:mousemove', ['$event'])
    onResize(event: MouseEvent) {
        if (!this.isResizing) {
            return
        }
        // Store in case of restore
        let prevX = this.posX
        let prevY = this.posY
        let prevHeight = this.height
        let prevWidth = this.width

        let clickX = event.clientX
        let clickY = event.clientY
        let diffX = clickX - this.lastClickX
        let diffY = clickY - this.lastClickY
        
        for (let resizeStrat of this.resizeStrats) {
            resizeStrat.call(this, diffX, diffY)
        }

        if (this.width < this.minDim || this.height < this.minDim) {
            this.posX = prevX
            this.posY = prevY
            this.height = prevHeight
            this.width = prevWidth
        }

        this.lastClickX = clickX
        this.lastClickY = clickY
    }

    @HostListener('document:mouseup', ['$event'])
    stopResize() {
        this.isResizing = false
    }

    resizeLeft(diffX: number, diffY: number) {
        this.posX += diffX
        this.width -= diffX
    }

    resizeRight(diffX: number, diffY: number) {
        this.width += diffX
    }

    resizeTop(diffX: number, diffY: number) {
        this.posY += diffY
        this.height -= diffY
    }

    resizeBottom(diffX: number, diffY: number) {
        this.height += diffY
    }
}
