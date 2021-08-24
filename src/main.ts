import App from './pages/App.svelte';

//require("dotenv").config();

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;