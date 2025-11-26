import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, ShoppingCart, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function SalesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Sales
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Track revenue and sales performance across all platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,456</div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <CreditCard className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10.09</div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">+5.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+24.8%</div>
            <p className="text-xs text-zinc-500 mt-1">
              Year-over-year growth
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Sales performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <p className="text-sm text-zinc-500">Revenue chart coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Titles</CardTitle>
            <CardDescription>Your best performing books</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">The Great Adventure</p>
                  <p className="text-sm text-zinc-500">$4,234 revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">423 units</p>
                  <p className="text-xs text-zinc-500">+15% this month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Mystery of the Night</p>
                  <p className="text-sm text-zinc-500">$3,567 revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">356 units</p>
                  <p className="text-xs text-zinc-500">+8% this month</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Journey to Success</p>
                  <p className="text-sm text-zinc-500">$2,890 revenue</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">289 units</p>
                  <p className="text-xs text-zinc-500">+12% this month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Breakdown</CardTitle>
          <CardDescription>Revenue by distribution platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Amazon KDP</p>
                <p className="text-sm text-zinc-500">Print and digital</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">$8,234</p>
                <p className="text-xs text-zinc-500">66% of total</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Audible / ACX</p>
                <p className="text-sm text-zinc-500">Audiobook sales</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">$3,456</p>
                <p className="text-xs text-zinc-500">28% of total</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">IngramSpark</p>
                <p className="text-sm text-zinc-500">Global distribution</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">$766</p>
                <p className="text-xs text-zinc-500">6% of total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

