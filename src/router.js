import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "admin",
            component: importComponent("DashboardLayout"),
            children: [
                {
                    path: "/",
                    name: "Root",
                    component: importComponent("DashboardIndex"),
                },
                {
                    path: "/login",
                    name: "Login",
                    component: importComponent("LoginPage"),
                },
                {
                    path: "/register",
                    name: "Register",
                    component: importComponent("RegisterPage"),
                },
                {
                    path: "/about",
                    name: "About",
                    component: importComponent("AboutPage"),
                },
                {
                    path: "/contact",
                    name: "Contact",
                    component: importComponent("ContactPage"),
                },
            ],
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: importComponent("views/DashboardPage"),
            
        },
        {
            path: "/editPage",
            name: "EditPage",
            component: importComponent("views/EditProfilePage"),
            
        },
        {
            path: "/memberPage",
            name: "MemberPage",
            component: importComponent("views/MemberPage"),
            
        },
        {
            path: "/teamPage",
            name: "TeamPage",
            component: importComponent("views/TeamPage"),
            
        },
    ],
});

export default router;