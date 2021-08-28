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
  import { Settings, CreateSchedule } from "./pages";
  import { Welcomer } from "./components";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/carbon-components-svelte@0.42.2/css/all.css"
  />
</svelte:head>

<Header company="Javi Viña's" platformName="Notion Weekify" />

<Content>
  <Grid fullWidth>
    <Row>
      <Column>
        <Welcomer />
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
        <Tabs>
          <Tab label="Crear horario" />
          <Tab label="Configuración" />
          <div slot="content">
            <br />
            <TabContent><CreateSchedule /></TabContent>
            <TabContent><Settings /></TabContent>
          </div>
        </Tabs>
      </Column>
    </Row>
  </Grid>
</Content>
