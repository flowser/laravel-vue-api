<template>
<div id="">

</div>
</template>

<script>

export default {
  data() {
        return {

        };
    },
    mounted() {
        this.$store.dispatch("destroyToken")
            .then(({response}) => {
                    this.$router.push({name:'Home'})
                    toast({
                            type: 'success',
                            title: 'You have been logged out successfully'
                    })
                        this.$Progress.finish()
                })
            .catch(({response}) => {
                this.$Progress.fail()
                toast({
                    type: 'error',
                    title: "something is wrong"
                })
            });
    }
}
</script>
