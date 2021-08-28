<script lang="ts">
  import {
    Grid,
    Row,
    Column,
    ContentSwitcher,
    Switch,
    DatePicker,
    DatePickerInput,
    ButtonSet,
    Button,
  } from "carbon-components-svelte";
  import { cursos, cuatrimestres, diasLaborables } from "../core";
</script>

<Grid fullWidth padding>
  <Row>
    <Column>
      <h4>Elige el curso</h4>
    </Column>
    <Column>
      <ContentSwitcher selectedIndex={1}>
        {#each cursos as curso}
          <Switch text={curso} />
        {/each}
      </ContentSwitcher>
    </Column>
  </Row>
  <Row>
    <Column>
      <h4>Elige el cuatrimestre</h4>
    </Column>
    <Column>
      <ContentSwitcher selectedIndex={1}>
        {#each cuatrimestres as cuatri}
          {#if cuatri !== "Anual"}
            <Switch text={cuatri} />
          {/if}
        {/each}
      </ContentSwitcher>
    </Column>
  </Row>
  <Row>
    <Column>
      <h4>Selecciona el <b>lunes</b> de la semana a crear</h4>
    </Column>
    <Column>
      <DatePicker datePickerType="single" on:change>
        <DatePickerInput
          size="xl"
          placeholder="mm/dd/yyyy"
          helperText="Cuidado que las semanas empiezan en domingo"
        />
      </DatePicker>
    </Column>
  </Row>
  <Row>
    <Column sm={{ span: 1, offset: 1 }}>
      <ButtonSet>
        <Button kind="secondary">Cancelar</Button>
        <Button>Generar clases</Button>
      </ButtonSet>
    </Column>
  </Row>
</Grid>
<br>
<br>
<Grid>
  <Row>
    {#each diasLaborables as diaLaborable}
      <Column>
        <Row>
          <h3>{diaLaborable}</h3>
        </Row>
      </Column>
    {/each}
  </Row>
</Grid>
