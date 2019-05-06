<template>
<div id="">
   <form role="form" @submit.prevent="login()" >
            <h5 class="text-center" id="">Login</h5>
                   <div class="row">
                        <div class="form-group col-md-12">
                            <label for="email" class=" col-form-label">Email </label>
                            <input v-model="loginform.username" type="email" name="email" placeholder="Email Address"
                                class="form-control" :class="{ 'is-invalid': loginform.errors.has('email') }" >
                            <has-error style="color: #e83e8c" :form="loginform" field="email"></has-error>
                        </div>
                    </div>
                    <div class=" row">
                        <div class="form-group col-md-12">
                            <label for="phone" class="col-form-label"> Password</label>
                            <input  ref="password" v-model="loginform.password" type="password" id="password" placeholder="Password"
                                class="form-control" :class="{ 'is-invalid': loginform.errors.has('password') }">
                            <has-error :form="loginform" field="password"></has-error>
                        </div>
                    </div>
                    <div class=" row">
                        <div class="form-group col-md-12">
                            <div class="form-check">
                                <el-checkbox v-model="loginform.remember">Option</el-checkbox>
                            </div>
                        </div>
                    </div>
                    <!-- <div class=" row">
                        <div class="form-group col-md-12">
                            <div class="form-check">
                                <a href="#" title="Reset password" @click.prevent="emailresetLinkModal()">Forgot Your Password?</a>
                            </div>
                        </div>
                    </div> -->
            <!-- <button type="button" class="btn btn-danger float-left" data-dismiss="modal">Cancel</button> -->
            <button :disabled="loginform.busy" type="submit" class="btn btn-success float-right">Login</button>

        </form>
</div>
</template>

<script>

export default {
  data() {
        return {
            loginform: new Form({
                        username:'',
                        password:'',
                        remember: false,
                }),
        };
    },

  methods: {
    login(){
        console.log(this.loginform)
        let data = this.loginform;
            this.$Progress.start();
            this.loginform.post('/api/login', data)
                .then(({data}) => {
                    auth.login(data.token, data.user);

                    this.$router.push('/dashboard');
                    toast({
                            type: 'success',
                            title: 'You have been logged in successfully'
                        })
                        this.$Progress.finish()
                })
                .catch(({response}) => {
                    // alert(response.data.message);
                    this.$Progress.fail()
                    toast({
                        type: 'error',
                        title: (response.data.message)
                    })
                });
        }
  }
}
</script>
