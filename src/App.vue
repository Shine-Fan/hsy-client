<template>
  <div id="app">
    <p id="loginStatus"><router-link to="/Login">Login</router-link></p>
    <div id="nav">
      <router-link to="/">新闻</router-link>|
      <router-link to="/BBS">论坛</router-link>
    </div>
    <router-view/>
    <div id="footer">这里是封底</div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color: #42b983;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: cornsilk;
}

#loginStatus {
  float: right;
}

#loginStatus a.router-link-exact-active {
  color: #42b983;
}

#loginStatus  a {
  font-weight: bold;
  color: #2c3e50;
}

#footer {
  background-color: #42b983;
}
</style>
