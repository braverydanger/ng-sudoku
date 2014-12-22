var MasterGrid = require('./gameboard/masterGrid');


window.mg = new MasterGrid(false, -.5);
mg.countShowingSlots();
var gb = document.getElementById("gameboard");
var gb2 = document.getElementById("gameboard2");

for (var i = 0; i < mg.board.length; i++) {
    var newSpan = document.createElement('span');
    newSpan.innerHTML = (mg.board[i].showValue ? mg.board[i].val : "&nbsp;");
    newSpan.className = "slot";
    newSpan.assocSlot = (function(aS) {
            aS.elem = newSpan;
            return aS;
        })(mg.board[i]);
    newSpan.onclick = (function(ctx, currentSpan) {
            return function() {
                //currentSpan.innerText = ctx.val;
                ctx.toggleSlot();
                var currentSelections = document.querySelectorAll(".selected");
                var currentHighlights = document.querySelectorAll(".highlighted");

                for (var i = 0; i < currentSelections.length; i++) {
                    currentSelections[i].classList.remove("selected");
                }

                for (var i = 0; i < currentHighlights.length; i++) {
                    currentHighlights[i].classList.remove("highlighted")
                }

                if (ctx.isSelected) {
                    currentSpan.classList.add("selected");
                    if (ctx.showValue) {
                        var allSlots = document.querySelectorAll(".slot");
                        for (var i = 0; i < allSlots.length; i++) {
                            if (currentSpan.innerText === allSlots[i].innerText) {
                                allSlots[i].classList.add("highlighted");
                            }
                        }
                    }
                }
            }
        })(mg.board[i], newSpan);

    gb.appendChild(newSpan);

    if ((i+1) % mg.gridBase === 0 && (i+1) % mg.gridRow !== 0) {
        var ns = document.createElement("span");
        ns.className = "pipe"
        ns.innerHTML = "&nbsp;"
        gb.appendChild(ns);
    }
    if ((i+1) % mg.gridRow === 0) {
        gb.appendChild(document.createElement("br"));
    }
    if ((i+1) % (mg.gridRow*mg.gridBase) === 0 && (i+1) < mg.fullGrid) {
        gb.appendChild(document.createElement("hr"));
    }
};

for (var i in mg.standardRow) {
    var selSpan = document.createElement("span");
    selSpan.innerText = i;
    if (
        mg.standardRow.hasOwnProperty(i)
        && mg.standardRow[i] === (mg.gridRow-1)
    ) {
        selSpan.classList.add("unavailable");
    }

    selSpan.onclick = (function(passValue, selSpan){
            return function() {
                var currentSelections = document.querySelectorAll(".selected");
                if (mg.selectedSlot && currentSelections.length) {
                    var firstCurSel = currentSelections[0];
                    if (mg.selectedSlot.setValue(passValue)) {
                        currentSelections[0].innerText = mg.selectedSlot.val;
                        for (var i = 0; i < currentSelections.length; i++) {
                            currentSelections[i].classList.remove("selected");
                        }
                        if (
                            mg.standardRow.hasOwnProperty(passValue)
                            && mg.standardRow[passValue] === (mg.gridRow-1)
                        ) {
                            selSpan.classList.add("unavailable");
                        }
                        mg.selectedSlot.toggleSlot();
                    } else {
                        // show slot error
                        firstCurSel.classList.add("error");
                        setTimeout(function(){
                            firstCurSel.classList.remove("error");
                        }, 1000);
                        return false;
                    }
                } else {
                    return false;
                };
            }
        })(i, selSpan)

    gb2.appendChild(selSpan);
}
