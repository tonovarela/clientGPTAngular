import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuItemComponent } from '@components/sidebar-menu-item/sidebar-menu-item.component';

import { routes } from 'src/app/app.routes';


@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, SidebarMenuItemComponent],
  templateUrl: './dashboardLayout.component.html',
})
export default class DashboardLayoutComponent {

  routes = computed(() => routes[0]
    .children
    ?.filter((route) => route.data).map(r => {
      return {
        icon: r.data?.["icon"],
        title: r.data?.["title"],
        description: r.data?.["description"],
        path: r.path!
      }
    }));

}
