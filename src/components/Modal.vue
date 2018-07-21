<!-- 面包屑组件 -->
<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>

<script>
    export default {
      props:["mdShow"],
      data(){
        return {

        }
      },
      methods:{
        //关闭模态框
        closeModal(){
          this.$emit('close');
        }
      }

    }
</script>

<style scoped>

</style>
