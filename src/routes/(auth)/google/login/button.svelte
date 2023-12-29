<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="post" action="/google/login" use:enhance>
	<button>Log In</button>
</form>
