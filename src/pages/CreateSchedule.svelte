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
  import useApi from "../api"



  let selectedCursoIndex = 3;
  let selectedCuatriIndex = 0;
  let selectedDate = ""; 

  let curso = cursos[selectedCursoIndex];
  let cuatri = cuatrimestres[selectedCuatriIndex];
  let fecha: Date | undefined = undefined;

  $: curso = cursos[selectedCursoIndex];
  $: cuatri = cuatrimestres[selectedCuatriIndex];
  $: fecha = new Date(selectedDate);

  const api = useApi();

</script>

<Grid padding>
  <Row>
    <Column lg={16}>
      <h4>Elige el curso</h4>
    </Column>
    <Column lg={16}>
      <ContentSwitcher bind:selectedIndex={selectedCursoIndex}>
        {#each cursos as curso}
          <Switch text={curso} />
        {/each}
      </ContentSwitcher>
    </Column>
  </Row>
  <Row>
    <Column lg={16}>
      <h4>Elige el cuatrimestre</h4>
    </Column>
    <Column lg={16}>
      <ContentSwitcher bind:selectedIndex={selectedCuatriIndex}>
        {#each cuatrimestres as cuatri}
          {#if cuatri !== "Anual"}
            <Switch text={cuatri} />
          {/if}
        {/each}
      </ContentSwitcher>
    </Column>
  </Row>
  <Row>
    <Column lg={16}>
      <h4>Selecciona un día de la semana a crear el horario</h4>
    </Column>
    <Column lg={16}>
      <DatePicker datePickerType="single" on:change bind:value={selectedDate}>
        <DatePickerInput
          size="xl"
          placeholder="mm/dd/yyyy"
          helperText="Cuidado que las semanas empiezan en domingo"
        />
      </DatePicker>
    </Column>
  </Row>
  <Row>
    <Column>
      <ButtonSet>
        <Button kind="secondary">Resetear</Button>
        <Button
          on:click={(_event) => {
            
            
            
            console.log(
              "Fecha: ",
              selectedDate,
              fecha,
              "Cuatri: ",
              cuatri,
              "Curso: ",
              curso
            );
          }}>Generar clases</Button
        >
      </ButtonSet>
    </Column>
  </Row>
</Grid>
<br />
<br />
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
