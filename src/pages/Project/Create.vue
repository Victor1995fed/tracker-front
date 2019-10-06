<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <edit-project data-background-color="green" :action="action"> </edit-project>
      </div>
    </div>
  </div>
</template>

<script>
import  {EditProject}  from "@/pages";

export default {        
  components: {
    EditProject
  },
  data() {
    return {
      action:'project/create',
    };
  },
};
</script>
