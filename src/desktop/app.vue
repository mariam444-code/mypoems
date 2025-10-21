<script setup>

import Books from "@/desktop/components/books.vue";
</script>

<template>
  <div id="menu">
    <header>
      <div id="links">
        <router-link to="/"><a>Home</a></router-link>
        <router-link to="/about"><a>about</a></router-link>
        <RouterLink to="/books">books</RouterLink>
      </div>
    </header>
  </div>


  <router-view />


</template>



<style scoped>
:global(body){
  margin: 0;
}
#menu{
  padding: 20px;
  font-size: 20px;
  background-color: yellow;
}

#menu header #links{
  display: flex;
  justify-content: center;
  gap: 20px;
}

#menu header #links router-link {
  text-decoration: none;
  color: white;
  padding: 5px;
  transition: 0.3s;
}

#menu header #links router-link:hover {
  text-decoration: underline;
  border-radius: 5px;
  scale: 1.2;
  transition: 0.3s;
}


</style>

<script setup>


</script>


