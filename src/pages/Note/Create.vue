<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <edit-note data-background-color="green" :action="action" :form="form" :parent_id="parent_id"> </edit-note>
      </div>
    </div>
  </div>
</template>

<script>
import  {EditNote}  from "@/pages";

export default {
  components: {
    EditNote
  },
  data() {
    return {
      form:[],
      action: 'note/create',
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
