// Enhanced Custom Mouse Pointer JavaScript

class EnhancedCursor {
  constructor() {
    this.cursor = null;
    this.cursorRing = null;
    this.trails = [];
    this.maxTrails = 8;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isHovering = false;
    this.isClicking = false;
    this.isTextMode = false;
    this.isLoading = false;
    this.isDisabled = false;

    this.init();
  }

  init() {
    // Check if device supports hover (not touch-only)
    if (window.matchMedia("(hover: none)").matches) {
      return; // Don't initialize on touch devices
    }

    this.createCursorElements();
    this.bindEvents();
    this.startAnimation();
  }

  createCursorElements() {
    // Create main cursor
    this.cursor = document.createElement("div");
    this.cursor.className = "custom-cursor";
    document.body.appendChild(this.cursor);

    // Create cursor ring
    this.cursorRing = document.createElement("div");
    this.cursorRing.className = "cursor-ring";
    document.body.appendChild(this.cursorRing);

    // Create trail elements
    for (let i = 0; i < this.maxTrails; i++) {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.opacity = (1 - i / this.maxTrails) * 0.7;
      trail.style.transform =
        "translate(-50%, -50%) scale(" + (1 - (i / this.maxTrails) * 0.5) + ")";
      document.body.appendChild(trail);
      this.trails.push({
        element: trail,
        x: 0,
        y: 0,
      });
    }
  }

  bindEvents() {
    // Mouse move event
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateCursorPosition();
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      this.cursor.style.opacity = "0";
      this.cursorRing.style.opacity = "0";
      this.trails.forEach((trail) => {
        trail.element.style.opacity = "0";
      });
    });

    // Show cursor when entering window
    document.addEventListener("mouseenter", () => {
      this.cursor.style.opacity = "1";
      this.cursorRing.style.opacity = "1";
      this.trails.forEach((trail, index) => {
        trail.element.style.opacity = (1 - index / this.maxTrails) * 0.7;
      });
    });
  }

  updateCursorPosition() {
    if (!this.cursor || !this.cursorRing) return;

    // Update main cursor position
    this.cursor.style.left = this.mouseX + "px";
    this.cursor.style.top = this.mouseY + "px";

    // Update ring position with slight delay
    this.cursorRing.style.left = this.mouseX + "px";
    this.cursorRing.style.top = this.mouseY + "px";
  }

  updateCursorState() {
    // This function is now empty as we want a consistent cursor
  }

  startAnimation() {
    const animate = () => {
      this.updateTrails();
      requestAnimationFrame(animate);
    };
    animate();
  }

  updateTrails() {
    // Update trail positions with delay
    for (let i = this.trails.length - 1; i > 0; i--) {
      this.trails[i].x = this.trails[i - 1].x;
      this.trails[i].y = this.trails[i - 1].y;
    }

    if (this.trails.length > 0) {
      this.trails[0].x = this.mouseX;
      this.trails[0].y = this.mouseY;
    }

    // Apply positions to trail elements
    this.trails.forEach((trail, index) => {
      trail.element.style.left = trail.x + "px";
      trail.element.style.top = trail.y + "px";
    });
  }

  // Method to destroy cursor (for cleanup)
  destroy() {
    if (this.cursor) {
      this.cursor.remove();
    }
    if (this.cursorRing) {
      this.cursorRing.remove();
    }
    this.trails.forEach((trail) => {
      trail.element.remove();
    });

    // Remove all event listeners
    document.removeEventListener("mousemove", this.updateCursorPosition);
    document.removeEventListener("mousedown", this.updateCursorState);
    document.removeEventListener("mouseup", this.updateCursorState);
  }
}

// Initialize enhanced cursor when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if user prefers reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return; // Don't initialize if user prefers reduced motion
  }

  // Check if device supports hover
  if (window.matchMedia("(hover: none)").matches) {
    return; // Don't initialize on touch devices
  }

  // Initialize the enhanced cursor
  window.enhancedCursor = new EnhancedCursor();
});

// Export for potential external use
if (typeof module !== "undefined" && module.exports) {
  module.exports = EnhancedCursor;
}
