<template>
    <nav id="menu">
        <ul>
            <li>
                <router-link :to="'/home/'">HOME</router-link>
            </li>
            <li>
                <router-link :to="'/BackOffice/'">BACK OFFICE</router-link>
            </li>
                        <li>
                <router-link :to="'/Login/'">LOGIN</router-link>
            </li>
        </ul>

    </nav>
</template>

<script>
export default {
    name: 'HeaderNoLoggued'
}
</script>