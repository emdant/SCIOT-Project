<script>
</script>

<nav>
  <ul>
    <li>Find Person Locations</li>
  </ul>
</nav>

<style>
  nav {
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: var(--nav-h);
    box-shadow: 0 -0.4rem 0.9rem 0.2rem rgb(0 0 0 / 50%);
  }

  ul {
    font-family: 'Bebas Neue', cursive;
    font-size: 3.5em;
    display: flex;
    margin-right: 5px;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }

  li {
    margin: 0 10px;
    transition: color .2s, border .2s, padding .2s;
  }

  li:hover {
    color: var(--focus-c);
  }

</style>