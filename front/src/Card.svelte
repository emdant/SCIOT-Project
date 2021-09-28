<script>
  export let building;
  export let room;
  export let time;
</script>

<div>
  <span>{building}</span>
  <span>{room}</span>
  <span>{time}</span>
</div>

<style>
  div {
    display: flex;
    flex-flow: column;
    justify-content: center;
    min-width: 120px;
    min-height: 140px;
    border: 2px solid gray;
    border-radius: 10px;
    margin: 5px 10px;
  }

  span {
    text-align: center;
  }
  
  div > span:nth-child(1) {
    font-size: 2em;
    font-weight: bold;
  }

  div > span:nth-child(2) {
    font-size: 1.2em;
  }

  div > span:nth-child(3) {
    margin-top: 5px;
  }
</style>