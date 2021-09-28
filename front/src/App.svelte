<script>
	import Navbar from './Navbar.svelte'
	import Card from './Card.svelte'
	let locations = [];
	let fiscalcode = "";
	let datetime = (new Date()).toISOString().split('T')[0];

	async function getLocations() {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const response = await fetch('http://localhost:32001', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				fiscalcode: fiscalcode.toUpperCase(),
				datetime: datetime
			})
		});

		const body = await response.json();
		locations = body.results;
	}

	function onKeyPress(e) {
    if (e.charCode === 13) 
			getLocations();
  }
	
</script>

<main>
	<Navbar/>
	<input on:keypress={onKeyPress} type="text" maxlength=16 placeholder="Fiscal Code" bind:value={fiscalcode}>
	<input on:keypress={onKeyPress} type="date" maxlength=16 placeholder="Fiscal Code" bind:value={datetime}>
	<button on:click={getLocations}>Get Locations</button>
	<content>
		{#each locations as {building, room, datetime}}
		<Card {building} {room} time={new Date(datetime).toLocaleTimeString()}/>
		{/each}
	</content>
</main>

<style>
	main {
		position: relative;
    margin: 0 auto;
    padding: var(--nav-h) 0 0 0;
    overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		border: 2px solid gray;
		border-radius: 10px;
		min-width: 500px;
    min-height: 45px;
	}

	input[type=text] {
		text-transform: uppercase;
	}

	input:focus {
		outline-color: var(--focus-c);
	}

	button {
		min-width: 140px;
    min-height: 40px;
	}

	content {
		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>