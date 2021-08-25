<script lang="ts">
  import {
    Header,
    Content,
    Grid,
    Row,
    Column,
    Tabs,
    Tab,
    TabContent,
  } from "carbon-components-svelte";
  import Home from "./pages/Home.svelte";
  import Settings from "./pages/Settings.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/carbon-components-svelte@0.42.2/css/all.css"
  />
</svelte:head>

<Header company="Javi Viña's" platformName="Notion Weekify" />

<Content>
  <Grid>
    <Row>
      <Column>
        <h1>Crea un horario en Notion de forma rápida y sencilla</h1>
      </Column>
    </Row>
	<Row>
		<Column>
		  <br />
		  <br />
		</Column>
	  </Row>
    <Row>
      <Column>
        <Tabs type="container">
          <Tab label="Crear el horario" />
          <Tab label="Configuración" />
          <div slot="content">
			<br />
            <TabContent><Home /></TabContent>
            <TabContent><Settings /></TabContent>
          </div>
        </Tabs>
      </Column>
    </Row>
  </Grid>
</Content>
