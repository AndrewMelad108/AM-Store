<template>
  <footer class="bg-blue-color min-h-[400px] w-full text-black pt-5">
    <div
      class="services lg:flex md:hidden sm:hidden max-md:hidden max-sm:hidden capitalize mt-[-50px] max-md:mt-[-60%] flex flex-row max-md:flex-col space-x-10 max-md:space-x-0 max-md:space-y-10 mx-32 max-md:mx-20 md:mx-16 mb-10"
    >
      <div
        class="bg-white rtl:mx-4 space-y-3 w-1/3 rounded-xl text-center min-h-[100px] p-5 max-md:w-full"
      >
        <img
          src="@/assets/images/icon_mony.png"
          alt="icon_mony"
          class="mx-auto"
          loading="lazy"
        />
        <p>{{ $t("Money Back") }}</p>
      </div>
      <div
        class="bg-white space-y-3 w-1/3 rounded-xl text-center min-h-[100px] p-5 max-md:w-full"
      >
        <img
          src="@/assets/images/icon_gift.png"
          alt="icon_mony"
          class="mx-auto"
          loading="lazy"
        />
        <p>{{ $t("Special Gift") }}</p>
      </div>
      <div
        class="bg-white space-y-3 w-1/3 rounded-xl text-center min-h-[100px] p-5 max-md:w-full"
      >
        <img
          src="@/assets/images/icon_car.png"
          alt="icon_mony"
          class="mx-auto"
          loading="lazy"
        />
        <p>{{ $t("Free Shipping") }}</p>
      </div>
    </div>
    <div class="services-des flex max-md:flex-col max-md:mx-2 mx-32 md:mx-14">
      <div
        class="text-white text-start space-y-3 w-1/3 rounded-xl min-h-[100px] p-5 max-md:w-full"
      >
        <h1 class="uppercase text-2xl">{{ $t("information") }}</h1>
        <p class="leading-[30px]">
          {{
            $t(
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected  humour, or randomised words which don't look even slightly believable"
            )
          }}
        </p>
      </div>
      <div
        class="text-white text-start space-y-3 w-1/3 rounded-xl min-h-[100px] p-5 max-md:w-full"
      >
        <h1 class="uppercase text-2xl">{{ $t("my account") }}</h1>
        <p class="leading-[30px]">
          {{
            $t(
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected  humour, or randomised words which don't look even slightly believable"
            )
          }}
        </p>
      </div>
      <div
        class="text-white text-start space-y-3 w-1/3 rounded-xl min-h-[100px] p-5 max-md:w-full"
      >
        <h1 class="uppercase text-2xl">{{ $t("about") }}</h1>
        <p class="leading-[30px]">
          {{
            $t(
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected  humour, or randomised words which don't look even slightly believable"
            )
          }}
        </p>
      </div>
      <div
        class="text-white text-start space-y-3 w-1/3 rounded-xl min-h-[100px] p-5 max-md:w-full"
      >
        <h1 class="uppercase text-2xl">{{ $t("contacts") }}</h1>
        <p class="leading-[30px]">
          {{
            $t(
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected  humour, or randomised words which don't look even slightly believable"
            )
          }}
        </p>
      </div>
    </div>
    <div
      class="copy-right bg-head-color text-black text-center py-5 max-md:w-full px-5"
    >
      {{ $t("2023 All Rights Reserved.") }}
      <span class="text-yellow-400">{{ $t("Design by AM developer") }}</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer-section",
};
</script>

<style></style>
