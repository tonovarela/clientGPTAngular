import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar-menu-item',
  imports: [RouterLink],
  templateUrl: './sidebar-menu-item.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  class SidebarMenuItemComponent {

  @Input({required:true}) icon!: string;
  @Input({required:true}) title!: string;
  @Input({required:true}) description!: string;
  @Input({required:true}) path!: string;

 }
