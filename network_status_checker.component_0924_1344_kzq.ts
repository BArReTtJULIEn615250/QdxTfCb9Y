// 代码生成时间: 2025-09-24 13:44:54
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * 网络连接状态检查器组件
 * 这个组件会监听网络状态变化，并在网络断开时提供反馈。
 */
@Component({
  selector: 'app-network-status-checker',
  template: `
    <p *ngIf="isOnline" style="color: green;">
      网络连接正常。
    </p>
    <p *ngIf="!isOnline" style="color: red;">
      网络连接已断开，请检查您的网络设置。
    </p>
  `,
})
export class NetworkStatusCheckerComponent implements OnInit, OnDestroy {
  /**
   * 网络连接状态
   */
  isOnline: boolean = true;

  /**
   * 路由订阅
   * 用于监听路由变化，以便在组件被销毁时取消订阅
   */
  private routerSubscription: Subscription;

  constructor(private router: Router) {
  }

  /**
   * 初始化方法
   * 设置初始的网络连接状态，并订阅路由事件
   */
  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.checkNetworkStatus();
      });

    // 检查初始网络状态
    this.checkNetworkStatus();
  }

  /**
   * 检查网络状态
   * 使用navigator.onLine检查网络连接状态
   */
  checkNetworkStatus(): void {
    this.isOnline = navigator.onLine;
  }

  /**
   * 销毁方法
   * 取消路由订阅
   */
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
