<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
      <md-button class="md-success" href="/#/project/choice">Добавить задачу</md-button>
<md-button class="md-success" href="/#/category/create/4">Добавить категорию</md-button>
<md-button class="md-success"  href="/#/project/create/5" >Добавить проект</md-button>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Ваши задачи</h4>
            <p class="category">Сортировка по активным</p>
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"></simple-table>
          </md-card-content>
        </md-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { SimpleTable} from "@/components";

export default {
  components: {
    SimpleTable
  }
};
</script>
