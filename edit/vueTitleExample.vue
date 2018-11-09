<template>
    <div class="vue-title">
        <h1 class="header">
          <span>Vue</span><span>.title</span>
        </h1>
        
        <a title="Lorem ipsum dolor sit amet, te debitis voluptatum" v-title href="#">Test it on hover</a>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400");

.title {
  background: rgba(0, 0, 0, .7);
  transition: opacity .5s .2s;
}

.title, .title .title-contents, .title .title-arrow {
  display: block;
}

.title .title-contents {
  padding: 3px 6px;
  max-width: 250px;
  max-height: 50px;
  overflow: hidden;
  color: #FFF;
  font-size: 15px;
  word-break: break-all;
}

.title .title-arrow {
  width: 0;
  height: 0;
}

.title[position=bottom] .title-arrow {
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid rgba(0, 0, 0, .7);
  margin-bottom: -0.32px;
}

.title[position=top] .title-arrow {
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, .7);
  margin-top: -0.32px;
}

body {
  background: #f8f8f8;
  font-family: "Source Sans Pro", sans-serif;
}
.vue-title {
  padding: 50px;
}
.vue-title .header {
  font-size: 40px;
  font-weight: 300;
  text-indent: 5px;
}
.vue-title .header span:first-child {
  color: #00bb7e;
}
.vue-title .header span:last-child {
  color: #304a60;
}
.vue-title a {
  font-size: 18px;
  font-weight: bold;
}
</style>