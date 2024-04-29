import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ListFilter, File } from 'lucide-react'
import { DateFormatter } from '@/utils/formatters'

export const TableOrders = () => {
  console.log(Date.now())
  return (
    <div className='fade-in'>
      <div className=' mb-2 flex items-center justify-end gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
              <ListFilter className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only'>Filtrar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Pagado</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>rechazado</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Reembolsado</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
          <File className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only'>Exportar</span>
        </Button>
      </div>
      <Card>
        <CardHeader className='px-7'>
          <CardTitle>Ordenes</CardTitle>
          <CardDescription>Ordenes recientes.</CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className='hidden sm:table-cell'>Type</TableHead>
                <TableHead className='hidden sm:table-cell'>Status</TableHead>
                <TableHead className='hidden md:table-cell'>Date</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className='bg-accent'>
                <TableCell>
                  <div className='font-medium'>Liam Johnson</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Olivia Smith</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    olivia@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Refund</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='outline'>
                    Declined
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Noah Williams</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    noah@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Subscription</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Emma Brown</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    emma@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$450.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Liam Johnson</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Liam Johnson</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    liam@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Olivia Smith</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    olivia@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Refund</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='outline'>
                    Declined
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='font-medium'>Emma Brown</div>
                  <div className='hidden text-sm text-muted-foreground md:inline'>
                    emma@example.com
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>Sale</TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge className='text-xs' variant='secondary'>
                    Fulfilled
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>{DateFormatter(Date.now())}</TableCell>
                <TableCell className='text-right'>$450.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
