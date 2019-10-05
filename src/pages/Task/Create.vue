<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <edit-task data-background-color="green" :action="action" :form="form" :parent_id="parent_id"> </edit-task>
      </div>
    </div>
  </div>
</template>

<script>
import  {EditTask}  from "@/pages";

export default {        
  components: {
    EditTask
  },
  data() {
    return {
      form:[],
      action: 'task/create',
      parent_id: null
    };
  },
  mounted() {
    let parent_id = this.$route.params.parent_id;
    // console.warn(this.$route.params);
    if(parent_id !== undefined){
      this.parent_id = parent_id
    }
  }
};
</script>
