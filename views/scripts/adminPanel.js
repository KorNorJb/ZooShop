const accordionContent = document.querySelectorAll(".accordion-content");
accordionContent.forEach((item, index) => {
    let header = item.querySelector("header");
    header.addEventListener("click", () => {
        item.classList.toggle("open");
        let description = item.querySelector(".description");
        if (item.classList.contains("open")) {
            description.style.height = `${description.scrollHeight}px`; //scrollHeight property returns the height of an element including padding , but excluding borders, scrollbar or margin
            item.querySelector("i").classList.replace("fa-plus", "fa-minus");
        } else {
            description.style.height = "0px";
            item.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
        removeOpen(index); //calling the funtion and also passing the index number of the clicked header
    })
})

function removeOpen(index1) {
    accordionContent.forEach((item2, index2) => {
        if (index1 != index2) {
            item2.classList.remove("open");
            let des = item2.querySelector(".description");
            des.style.height = "0px";
            item2.querySelector("i").classList.replace("fa-minus", "fa-plus");
        }
    })
}

function name(params) {

}

let deleteBtn = document.querySelectorAll('.deletebtn')
deleteBtn.forEach((button, i) => {
    button.addEventListener('click', () => {
        const endPoint = `/adminpanel/${button.classList[1]}`
        console.log(endPoint)
        fetch(endPoint, {
            method: 'DELETE'
        })
        window.location.href = '/adminpanel'
    })
});

// this._el.addEventListener('click', (e) => {
//     // получим элемент .accordion__header
//     const elHeader = e.target.closest('.accordion__header');
//     // если такой элемент не найден, то прекращаем выполнение функции
//     if (!elHeader) {
//         return;
//     }
//     // если необходимо, чтобы всегда был открыт один элемент
//     if (!this._config.alwaysOpen) {
//         // получим элемент с классом accordion__item_show и сохраним его в переменную elOpenItem
//         const elOpenItem = this._el.querySelector('.accordion__item_show');
//         // если такой элемент есть
//         if (elOpenItem) {
//             // и он не равен текущему, то переключим ему класс accordion__item_show
//             elOpenItem !== elHeader.parentElement ? elOpenItem.classList.toggle('accordion__item_show') : null;
//         }
//     }
//     // переключим класс accordion__item_show элемента .accordion__header
//     elHeader.parentElement.classList.toggle('accordion__item_show');
// });