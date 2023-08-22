
// Dom element
const cupWrapper = document.querySelector('.cups');
const smallcups = cupWrapper.children;
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage');
const capacity = document.getElementById('remained')
const cup = document.getElementById('cup')

// public variables 
const smallcupsArray = Object.keys(smallcups).map(key => smallcups[key]);
const lastindex = smallcupsArray.length;
let removedArray = [];
let remainedwater = 2;
let drunkWater = 0
let amountOfWater = 0

runApplication();

function runApplication() {
    liters.innerText = '2L'
    for (let i = 0; i < smallcupsArray.length; i++) {
        smallcupsArray[i].addEventListener('click', () => {
            let indexOfClickedCup = i
            checkTheCupsToMakeThemFullOrEmpety(indexOfClickedCup)
        })
    }
}


function checkTheCupsToMakeThemFullOrEmpety(indexOfClickedCup) {
    let cupFull = new CupFull();
    if ((smallcupsArray[indexOfClickedCup].classList.contains('full'))) {
        cupFull.makeTheCupsEmp(indexOfClickedCup, lastindex);

    } else if (!(smallcupsArray[indexOfClickedCup].classList.contains('full'))) {
        cupFull.makeTheCupsFull(indexOfClickedCup);

    }
}


class CupFull {

    makeTheCupsFull(indexOfClickedCup) {
        drunkWater = 0
        amountOfWater = 0
        remainedwater = 2
        for (let i = 0; i <= indexOfClickedCup; i++) {
            this.increaseTheAmountOfwater();
            smallcupsArray[i].classList.add('full')
        }
    }
    increaseTheAmountOfwater() {
        drunkWater += 12.5;
        if (drunkWater > 87.5) {
            cup.style.backgroundColor = 'var(--fill-color)'
            capacity.style.display = 'none';

        } else {
            cup.style.backgroundColor = '#fff'
            capacity.style.display = 'flex';
        }
        amountOfWater += 41.25;
        remainedwater = remainedwater - 0.25;
        percentage.innerText = `${drunkWater}%`
        percentage.style.visibility = 'visible'
        percentage.style.height = `${amountOfWater}px`
        liters.innerText = `${remainedwater}`
  
    }
    


    makeTheCupsEmp(indexOfClickedCup, lastindex) {
        for (let j = lastindex - 1; j > indexOfClickedCup; j--) {
            removedArray.push(smallcupsArray[j])
        }
        const NoElementWithFullClass = removedArray.every(cup => !(cup.classList.contains('full')));
        if (NoElementWithFullClass) {
            smallcupsArray[indexOfClickedCup].classList.remove('full'); 
            this.makeTheLastCupOfWaterEmpety();
        } else {
            drunkWater = 100
            amountOfWater = 0
            remainedwater = 0
            for (let j = lastindex - 1; j > indexOfClickedCup; j--) {
                smallcupsArray[j].classList.remove('full');
                amountOfWater += 41.25
                remainedwater += 0.25;
                drunkWater -= 12.5;
                this.decreaseTheAmountOfwater(amountOfWater, remainedwater, drunkWater)
            }
        }
    }
    
    decreaseTheAmountOfwater(amountOfWater, remainedwater, drunkWater) {
        let height = 330;
        height = height - amountOfWater;
        percentage.innerText = `${drunkWater}%`
        percentage.style.visibility = 'visible'
        percentage.style.height = `${height}px`
        liters.innerText = `${remainedwater}`
    }
    makeTheLastCupOfWaterEmpety(){
        percentage.style.visibility = 'hidden';
        percentage.style.height = `${0}px`;
        liters.innerText = `2`;
    }
}