<template>
    <div id="wrapper">
        <main>
            <AppBar></AppBar>
            <webview id="foo" src="https://twitch.tv/"
                     style="display:inline-flex; width:100%; height:100vh"></webview>
        </main>
    </div>
</template>

<script>
  import AppBar from '../components/AppBar';

  export default {
    components: {
      AppBar,
    },
    name: 'home',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>

</style>
