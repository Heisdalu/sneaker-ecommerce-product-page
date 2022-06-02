"use strict"

const hamburger = document.getElementById("hamburger")
const hamburgerList = document.querySelector(".hamburger--links")
const fadeIn_Blur = document.querySelector(".blur")

const exit_hamburgerList = document.getElementById("exit-btn")
const imageslider__pics = document.querySelectorAll(".mobile-img")
const slider_Control = document.getElementById("products--slider")

const product_QuantityBox = document.querySelector(".product-quantity")
const product__Quantity = document.querySelector(".amount")
let product__Quantity_No = +document.querySelector(".amount").textContent

const add_ToCart_Btn = document.querySelector("#product-button")

const item_box = document.querySelector(".basket")
const cart_icon = document.getElementById("cart-box")
const cart_box = document.querySelector(".basket")

hamburger.addEventListener("click", (e) => {
  hamburgerList.style.left = "0"
  fadeIn_Blur.classList.toggle("modal")
})

exit_hamburgerList.addEventListener("click", (e) => {
  hamburgerList.style.left = "-100%"
  fadeIn_Blur.classList.toggle("modal")
})

let count = 0

function slide(num) {
  imageslider__pics.forEach((el, i) => {
    el.style.transform = `translateX(-${num * 100}%)`
  })
}

slide(0)

// slider
slider_Control.addEventListener("click", (e) => {
  const clicked = e.target.closest(".parent-control")

  if (!clicked) return

  if (clicked.id === "next-btn") {
    count++
    if (count >= 0 && imageslider__pics.length > count) {
      slide(count)
    } else {
      count = 0
      slide(count)
    }
  }

  if (clicked.id === "previous-btn") {
    count--
    if (count >= 0 && imageslider__pics.length > count) {
      slide(count)
    } else {
      count = imageslider__pics.length - 1
      slide(count)
    }
  }
})

// product quantity
product_QuantityBox.addEventListener("click", (e) => {
  const clicked = e.target.closest(".control")
  // decrease button
  if (clicked.classList.contains("decrease")) {
    if (product__Quantity.textContent > 0) {
      product__Quantity.textContent = --product__Quantity_No
    } else {
      product__Quantity_No = 0
      product__Quantity.textContent = product__Quantity_No
    }
  }

  // increase button
  if (clicked.classList.contains("increase")) {
    product__Quantity.textContent = ++product__Quantity_No
  }
})

const no_item_of_Selected = document.querySelector(".item-selected")
// product-butoon
add_ToCart_Btn.addEventListener("click", () => {
  if (product__Quantity_No > 0) {
    document.querySelectorAll(".cart-box").forEach((el) => {
      el.remove()
    })

    document.querySelector(".empty-cart").style.display = "none"
    no_item_of_Selected.textContent = product__Quantity_No
    no_item_of_Selected.style.display = "inline"

    const html = `
    <article class="cart-box">
    <div class="cart-item">
    <span class="item-img"
    ><img src="./images/image-product-1-thumbnail.jpg" alt=""
    /></span>
    <p class="item-details">
    <span class="item-name item-span">Autumn Limited Edition</span>
    <span class="item-span item-amount">$125.00 x ${product__Quantity_No}  <span class="item-price"> $${
      125 * product__Quantity_No
    }.00</span></span>
    </p>
    
    <span><img src="./images/icon-delete.svg" alt=""></span>
    </div>
    
    <button class="check-out">Checkout</button>
    </article>
    `

    item_box.insertAdjacentHTML("beforeend", html)
    document.querySelector(".cart-box").style.display = "block"
  } else {
    document.querySelector(".cart-box").style.display = "none"
    document.querySelector(".empty-cart").style.display = "block"
    no_item_of_Selected.style.display = "none"
  }
})

cart_icon.addEventListener("click", () => {
  cart_box.classList.toggle("clear")
})

const desktop_left_control = document.querySelector(".dekstop-slider-left")
const desktop_right_control = document.querySelector(".dekstop-slider-right")
const desktopSlider__pics = document.querySelectorAll(".desktop-img")
const desktopThumbNail = document.querySelectorAll(".desktop-thumbnail")

let count2 = 0

function desktop_slide(num) {
  desktopSlider__pics.forEach((el, i) => {
    el.style.transform = `translateX(-${num * 100}%)`
  })
}

function coverUp(num) {
  desktopThumbNail.forEach((el) => {
    el.classList.remove("blur-thumbnail")
  })
  const val = [...desktopThumbNail].find((el) => +el.dataset.tab === count2)
  val.classList.add("blur-thumbnail")
}

desktop_slide(0)
coverUp(0)

desktop_left_control.addEventListener("click", () => {
  count2--
  if (count2 >= 0 && desktopSlider__pics.length > count2) {
    desktop_slide(count2)
    coverUp(count2)
  } else {
    count2 = desktopSlider__pics.length - 1
    coverUp(count2)
    desktop_slide(count2)
  }
})

desktop_right_control.addEventListener("click", () => {
  count2++
  if (count2 >= 0 && desktopSlider__pics.length > count2) {
    desktop_slide(count2)
    coverUp(count2)
  } else {
    count2 = 0
    desktop_slide(count2)
    coverUp(count2)
  }
})

//click to move the item
desktopThumbNail.forEach((item) => {
  item.addEventListener("click", (e) => {
    count2 = +e.target.dataset.tab
    desktop_slide(count2)
    coverUp(count2)
  })
})

//activate desktop slider
document
  .querySelector(".desktop-img-thumbnail")
  .addEventListener("click", () => {
    document.querySelector(".image-slider-modal").style.display = "flex"
    document.querySelector('.basket').classList.remove('clear')
  })

// close  desktop slider modal
document.querySelector(".close-btn-svg").addEventListener("click", () => {
  document.querySelector(".image-slider-modal").style.display = "none"
})
