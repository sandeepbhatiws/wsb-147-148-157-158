"use client"
import React, { useState } from 'react'
import HomeProductSection from './HomeProductSection';

export default function ProductDetail() {
    
    const [relatedProducts, setRelatedProducts] = useState([1,1,1,1]);

  return (
    <>
        <section
        class="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10"
      >
        {/* <!-- image gallery --> */}

        <div class="container mx-auto px-4">
          <img
            class="w-full"
            src="../images/product-bigsofa.png"
            alt="Sofa image"
          />

          <div class="mt-3 grid grid-cols-4 gap-4">
            <div>
              <img
                class="cursor-pointer"
                src="../images/kitchen.png"
                alt="kitchen image"
              />
            </div>

            <div>
              <img
                class="cursor-pointer"
                src="../images/living-room.png"
                alt="kitchen image"
              />
            </div>

            <div>
              <img
                class="cursor-pointer"
                src="../images/outdoors.png"
                alt="kitchen image"
              />
            </div>

            <div>
              <img
                class="cursor-pointer"
                src="../images/product-chair.png"
                alt="kitchen image"
              />
            </div>
          </div>
          {/* <!-- /image gallery  --> */}
        </div>

        {/* <!-- description  --> */}

        <div class="mx-auto px-5 lg:px-5">
          <h2 class="pt-3 text-2xl font-bold lg:pt-0">BIG ITALIAN SOFA</h2>
          <div class="mt-1">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-yellow-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-yellow-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-yellow-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-yellow-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4 text-gray-200"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>

              <p class="ml-3 text-sm text-gray-400">(150 reviews)</p>
            </div>
          </div>

          <p class="mt-5 font-bold">
            Availability: <span class="text-green-600">In Stock</span>
          </p>
          <p class="font-bold">Brand: <span class="font-normal">Apex</span></p>
          <p class="font-bold">
            Cathegory: <span class="font-normal">Sofa</span>
          </p>
          <p class="font-bold">
            SKU: <span class="font-normal">BE45VGTRK</span>
          </p>

          <p class="mt-4 text-4xl font-bold text-violet-900">
            $450 <span class="text-xs text-gray-400 line-through">$550</span>
          </p>

          <p class="pt-5 text-sm leading-5 text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
            exercitationem voluptate sint eius ea assumenda provident eos
            repellendus qui neque! Velit ratione illo maiores voluptates commodi
            eaque illum, laudantium non!
          </p>

          <div class="mt-6">
            <p class="pb-2 text-xs text-gray-500">Size</p>

            <div class="flex gap-1">
              <div
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                XS
              </div>
              <div
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                S
              </div>
              <div
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                M
              </div>

              <div
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                L
              </div>

              <div
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                XL
              </div>
            </div>
          </div>

          <div class="mt-6">
            <p class="pb-2 text-xs text-gray-500">Color</p>

            <div class="flex gap-1">
              <div
                class="h-8 w-8 cursor-pointer border border-white bg-gray-600 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              ></div>
              <div
                class="h-8 w-8 cursor-pointer border border-white bg-violet-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              ></div>
              <div
                class="h-8 w-8 cursor-pointer border border-white bg-red-900 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              ></div>
            </div>
          </div>

          <div class="mt-6">
            <p class="pb-2 text-xs text-gray-500">Quantity</p>

            <div class="flex">
              <button
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                &minus;
              </button>
              <div
                class="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500"
              >
                1
              </div>
              <button
                class="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                &#43;
              </button>
            </div>
          </div>

          <div class="mt-7 flex flex-row items-center gap-6">
            <button
              class="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-3 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              Add to cart
            </button>
            <button
              class="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="mr-3 h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>

              Wishlist
            </button>
          </div>
        </div>
      </section>

      <section class="container mx-auto max-w-[1200px] px-5 py-5 lg:py-10">
        <h2 class="text-xl">Product details</h2>
        <p class="mt-4 lg:w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          consequatur temporibus deserunt id labore. Et, iusto nostrum repellat
          laudantium iure fuga quibusdam laborum laboriosam earum. Fugit
          possimus impedit harum dolor? <br />
          Laboriosam quo impedit, reprehenderit eum eaque eius tempore non
          blanditiis, labore quibusdam nesciunt atque doloribus cum autem?
          <br />
          Autem magni ullam alias pariatur corporis officiis animi neque, quo,
          ab aperiam ratione! Similique deserunt dolore dignissimos, iure
          quisquam mollitia perferendis pariatur reprehenderit dolorem, cum enim
          aut ad amet in ducimus sint, commodi neque quis saepe libero dolor
          dolores. Sequi voluptas adipisci minus!
        </p>

        <table class="mt-7 w-full table-auto divide-x divide-y lg:w-1/2">
          <tbody class="divide-x border">
            <tr>
              <td class="border pl-4 font-bold">Color</td>
              <td class="border pl-4">Black, Brown, Red</td>
            </tr>

            <tr>
              <td class="border pl-4 font-bold">Material</td>
              <td class="border pl-4">Latex</td>
            </tr>

            <tr>
              <td class="border pl-4 font-bold">Weight</td>
              <td class="border pl-4">55 Kg</td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* <!-- /product details  --> */}

      {/* <!-- /description  --> */}

      {/* <p class="mx-auto mt-10 mb-5 max-w-[1200px] px-5"></p> */}

      {/* <!-- Recommendations --> */}
      <HomeProductSection title="RELATED PRODUCTS" productData={relatedProducts}/>
      {/* <!-- /Recommendations --> */}
    </>
  )
}
