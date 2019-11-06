import Vue from 'vue'
// import 'element-ui/lib/theme-chalk/index.css'  // 默认主题
import '../../theme/index.css'  // 自定义主题

import {
    Icon,
    Input,
    Button,
    Message,
    Form,
    FormItem,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Collapse,
    CollapseItem,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Upload,
    Select,
    Option,
    Switch,
    RadioGroup,
    RadioButton,
    Table,
    TableColumn,
    Tag,
    MessageBox,
    Tooltip
} from 'element-ui';

Vue.use(Icon);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Upload);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Tooltip);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;