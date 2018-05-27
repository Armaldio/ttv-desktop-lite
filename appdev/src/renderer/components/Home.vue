<template>
    <div id="wrapper">
        <main>
            <webview id="foo" src="https://twitch.tv/"
                     style="display:inline-flex; width:100%; height:100vh"></webview>
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
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>

</style>
