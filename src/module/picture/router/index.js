import Home from '@/module/home/page/home.vue';
import picture from '@/module/picture/page/manage_picture.vue';
export default [
  {
    path: '/picture',
    component: Home,
    name: '图片管理',
    hidden: false,
    iconCls: 'el-icon-picture',
    children: [
      { path: '/pics', name: '课程图片',component: picture,hidden: false },
    ]
  }
]
