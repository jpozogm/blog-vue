<template>

    <blog-navbar>
        <div slot="navbar__items">
            <div class="navbar__btns flex">
                <router-link :to="'/home/'"><blog-navbar-btn text="HOME"></blog-navbar-btn></router-link>    
                <router-link :to="'/BackOffice/'"><blog-navbar-btn text="BACK OFFICE"></blog-navbar-btn></router-link>
                <router-link :to="'/Login/'"><blog-navbar-btn text="LOGIN"></blog-navbar-btn></router-link>
            </div>
        </div> 
    </blog-navbar>
</template>

<script>
export default {
    name: 'HeaderNoLoggued'
}
</script>




