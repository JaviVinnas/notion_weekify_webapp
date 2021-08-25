<script lang="ts">
    const currentHour = new Date().getHours();
    let message = "Welcome"
    if(currentHour >= 0 && currentHour < 16) message = "Buenos días";
    if(currentHour >= 16 && currentHour < 21) message = "Buenas tardes";
    if(currentHour >= 21 && currentHour < 24) message = "Buenas noches";

</script>

<h1>{message}</h1>