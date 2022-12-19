<template>
  <div>
    <VueSidebarMenu/>
        <section class="home-section">
            <div class="text">
                <h1>Jadwal</h1> 
            </div>
            <hr>
            <div class="container">
                 <div class="row">
                     <div class="col-md-12">
                         <div class="card">
                             <div class="card-body">
                                 <div class="table-responsive">
                                     <table class="table">
                                         <thead class=" text-primary">
                                             <th>
                                                No
                                             </th>
                                             <th>
                                                Team 1
                                             </th>
                                             <th>
                                             </th>
                                             <th>
                                                Team 2
                                             </th>
                                             <th>
                                                Tanggal
                                             </th>
                                             <th>
                                                Waktu
                                             </th>
                                         </thead>
                                         <tbody>
                                            <br>
                                             <tr v-for="(jadwal, index) in jadwals" :key="jadwal.id">
                                                 <td>
                                                    {{ index + 1 }}
                                                 </td>
                                                 <td>
                                                    {{ jadwal.team1 }}
                                                 </td>
                                                 <td>
                                                    VS
                                                 </td>
                                                 <td>
                                                    {{ jadwal.team2 }}
                                                 </td>
                                                 <td>
                                                    {{ jadwal.tanggal }}
                                                 </td>
                                                 <td>
                                                    {{ jadwal.waktu }}
                                                 </td>
                                             </tr>
                                         </tbody>
                                     </table>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </section>
  </div>
</template>

<script>
  import VueSidebarMenu from "../MenuSidebar";
//   import { withValidation } from 'vee-validate';

//     const VTextFieldWithValidation = withValidation(VTextField);


  export default {
    components: {VueSidebarMenu},
    data() {
      return {
        jadwals: [
            {
                id: 1,
                team1: "Team 1",
                team2: "Team 2",
                tanggal: "2021-05-01",
                waktu: "12:00",
            },
            {
                id: 2,
                team1: "Team 3",
                team2: "Team 4",
                tanggal: "2021-05-02",
                waktu: "13:00",
            },
            {
                id: 3,
                team1: "Team 5",
                team2: "Team 6",
                tanggal: "2021-05-03",
                waktu: "14:00",
            },
            {
                id: 4,
                team1: "Team 7",
                team2: "Team 8",
                tanggal: "2021-05-04",
                waktu: "15:00",
            },
        ],

      }
    }
  }
</script>