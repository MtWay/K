<template>
<div>
<a href="http://localhost:8081/#/test">test</a>
    <button  @mouseenter="b()" @[click]="a">click</button>
</div>
</template>
<script>
export default {
    data(){
        return {
            click:'click'
        }
    },
    mounted(){
        console.log(this.$route.params)
    },
    methods:{
        a(){    
            console.log("a");
        },
        b(){
            console.log("b");
        }
    }
}
</script>