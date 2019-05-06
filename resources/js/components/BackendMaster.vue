<template>
    <div class="backend-Master">
        <div class="backendmaster">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/dashboard">Dashboard</router-link>
        </div>

        <div>
            <div v-if="authenticated && user">
                <p>Hello, {{ user.name }}</p>

                <router-link to="/logout">Logout</router-link>
            </div>

            <router-link to="/login" v-else>Login</router-link>
        </div>
        <!-- Navbar -->
            <!-- <TopHeader/> -->
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
            <!-- <SideBar/> -->
        <!-- Main Sidebar Container -->

        <!-- Content Wrapper. Contains page content -->

            <vue-progress-bar></vue-progress-bar>
            <router-view></router-view>
        <!-- /.content-wrapper -->

        <!-- /.footer -->
            <!-- <Footer/> -->
        <!-- /.footer -->
    </div>
</template>

<script>
// import TopHeader from "../pages/includes/backend/Header-Top";
// import SideBar from "../pages/includes/backend/Left-SideBar";
// import Footer from "../pages/includes/backend/Footer";
    export default {
        name:"BackedMaster",
         components:{
            // TopHeader,
            // SideBar,
            // Footer,
         },
         data(){
            return{
                authenticated: auth.check(),
                user: auth.user
           };
        },
        mounted() {
           console.log('Admin Master mounted.');
            Event.$on('userLoggedIn', () => {
                this.authenticated = true;
                this.user = auth.user;
            });
        }
    }
</script>
