<template>
  <div id="about" class="q-pa-md">
    <section class="my-card">

      <h4>About the app</h4>

      <section class="me">
        <p class="photo-box">
          <img class="photo" src="../assets/me.jpg" alt="my photo">
        </p>

        <div class="info">
          <p>Author: Arina Momot</p>
          <q-item-label caption>Email: momotari@fel.cvut.cz</q-item-label>
          <br>
          <q-item-label>Year of creation: 2021</q-item-label>
          <q-item-label>Nejake info o semestralke</q-item-label>
        </div>
      </section>

      <!--  TODO: `поменять на правильную документацию-->
      <h4>Documentation for web</h4>
      <p><a href='../assets/dok.pdf'>Documentation</a></p>
      <!--          <p><a href="source-code.7z">Source code</a></p>-->
    </section>
  </div>
</template>

<style>
.my-card {
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: block;
  margin: 20px;
}

h4 {
  font-weight: bold;
  text-align: center;
}

.me {
  position: center;
}

.photo-box, .info {
  text-align: center;
}

.photo {
  border: 1px solid lightgray;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  height: 100px;
  width: 100px;
}

@media (max-width: 600px) {
  h4 {
    font-size: 20px;
  }
}
</style>
