<template>
<div>
<a href="http://localhost:8081/#/test" target="_blank">test</a>
<a href="http://localhost:8080/#/test" target="_blank">this</a>

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
        let sec = sessionStorage.getItem("sec");
        console.log(sec,new Date());
        sessionStorage.setItem("sec",new Date());
        sec = sessionStorage.getItem("sec");
        console.log(sec);

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