<template>

<div>
    <div class="tag-list">
<!--        TODO:: Добавить скрытие для меток-->
<!--    <h4>Ваши метки</h4>-->
    <md-chip  v-for="(data,index) in tags" :key="index" @click="setTag(data)" md-clickable>{{data.title}}</md-chip>
    </div>

    <div class="tag-choice">
        <h4>Выбранные метки</h4>
        <md-chip  v-for="(data,index) in choiceTags" :key="index" md-deletable @md-delete="removeTag(data)">{{data.title}}</md-chip>
        <md-button
                v-if="JSON.stringify(choiceTags)  !== '{}'"
                class="md-just-icon md-simple md-danger"
                @click="removeAll()"
        >
            <md-icon>clear</md-icon>
            <md-tooltip md-direction="top">Сбросить выбор</md-tooltip>
        </md-button>
    </div>
</div>


</template>

<script>
    export default {
        name: "TaskTag",
        props: {
            tagsUrl:{
                default:[]
            }
        },
        data: () => ({
            tags:[],
            choiceTags:{
            },
            choiceTagsId:[]
        }),
        created() {
            console.warn('TagsURL',this.tagsUrl);

        },
  mounted() {
    let _this = this;
            this.$http.get(this.$settings.TAG_LIST)
                .then(function (response) {
                    if (response.data) {
                        _this.tags = response.data;
                        _this.setTagsUrl()
                    } else {
                        alert('error')
                    }
                })
        },
        methods: {
            setTag: function(data) {
                this.$set( this.choiceTags,data.id,data)
                console.warn('ID',data)
                // let url = "http://tracker-api.zz/task/test?page=1&done=1&period=1";
                this.init()
            },
            setTagsUrl: function () {
              if(this.tagsUrl.length  > 0)
                  for (let key in this.tags) {
                      if(this.tagsUrl.indexOf(this.tags[key].id) !== -1)
                          this.$set( this.choiceTags,this.tags[key].id,this.tags[key])
                  }
            },
            removeTag: function (data) {
                console.warn('DEL')
                this.$delete(this.choiceTags, data.id)
                this.init()
            },
            removeAll: function () {
                this.choiceTags = {};
                this.init()
            },
            init: function () {
                let params = {
                    'id':Object.keys(this.choiceTags)
                }
                console.warn('PARAMS',params)
                this.$emit("filter", params);
            }
        }
    }
</script>

<style scoped>

</style>
