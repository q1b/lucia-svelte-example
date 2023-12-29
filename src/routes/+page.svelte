<script lang="ts">
	import Logout from './(auth)/google/logout/button.svelte';
	import Login from './(auth)/google/login/button.svelte';
	export let data;
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<a href="/google/login">login with google</a>
<a href="/google/logout">logout with google</a>
<hr />
<Logout />
<Login />
