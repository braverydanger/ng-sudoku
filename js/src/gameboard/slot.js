module.exports = (function(){
    var slot = function(parentGrid, m, g, r, c) {
        if (!parentGrid) {
            return false;
        }
        this.master = m || 0;
        this.grid = g || 0;
        this.row = r || 0;
        this.col = c || 0;
        this.val = 0;
        this.isSelected = false;
        this.showValue = true;
        this.parentGrid = parentGrid;
        this.elem = false;
    };

    slot.prototype = {
        constructor : slot,
        toggleSlot : function() {
            if (this.parentGrid.selectedSlot && !this.isSelected) {
                this.parentGrid.selectedSlot.isSelected = false;
            }
            this.isSelected = !this.isSelected;
            this.parentGrid.setSelectedSlot((this.isSelected && this.master));
        },
        setValue : function(tstVal) {
            if (tstVal && tstVal === this.val) {
                this.val = tstVal;
                this.showValue = true;
                return true;
            }
            return this.showError();

        },
        showError : function() {
            this.parentGrid.errorCount++;
            return false;
        },
        /*
         * possibleValues:
         * Checks for possible values to be assigned to a slot.
         * Returns an array of values,
         * or false if no values exist
         * @param gc : the gridCheckers object
         * @param sr : the standardRow array
         */
        possibleValues : function(gc, sr) {
            var retArray = [];
            for (var i in sr) {
                gc.rows[this.row].indexOf(i) < 0
                && gc.cols[this.col].indexOf(i) < 0
                && gc.grid[this.grid].indexOf(i) < 0
                && retArray.push(i);
            }
            var rando = Math.floor(Math.random()*retArray.length);
            return retArray.length ? retArray[rando] : false;
        }
    }

    return slot;
})();
