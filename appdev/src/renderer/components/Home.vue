<template>
    <div id="wrapper">
        <main>
            <webview id="webview" src="https://twitch.tv/" allowpopups
                     style="display:inline-flex; width:100%; height:100vh;"></webview>
        </main>
    </div>
</template>

<script>
  import AppBar from './AppBar';

  export default {
    name: 'home',
    components: {
      AppBar,
    },
  };
</script>

<style scoped>
	html {
	overflow: hidden;
	}

    main {
        width: 100%;
        height: 100%;
    }

    #wrapper {
        width: 100%;
    }
</style>
