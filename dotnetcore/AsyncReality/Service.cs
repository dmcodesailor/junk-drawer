using System;
using System.Threading.Tasks;

namespace AsyncReality
{
    public class Service
    {
        public Service()
        {
            // Default Constructor
        }

        public void Jfdi(string id)
        {
            System.Console.WriteLine("\t============using .Wait()============");
            System.Console.WriteLine("1a::Jfdi::{0}", System.DateTime.Now.Second);
            LongRunningAsyncOperationAwaited(id).Wait();
            System.Console.WriteLine("1b::Jfdi::{0}", System.DateTime.Now.Second);
            LongRunningAsyncOperation(id).Wait();
            System.Console.WriteLine("\t============Beginning Unawaited Portion============");
            System.Console.WriteLine("1c::Jfdi::Not Awaited::{0}", System.DateTime.Now.Second);
            LongRunningAsyncOperationAwaited(id);
            System.Console.WriteLine("1d::Jfdi::Not Awaited::{0}", System.DateTime.Now.Second);
            LongRunningAsyncOperation(id);
            System.Console.WriteLine("1e::Jfdi::{0}", System.DateTime.Now.Second);
        }

        public async void JfdiFreeForAll(string id)
        {
            System.Console.WriteLine("\t============Using 'await'============");
            System.Console.WriteLine("1a::JfdiFreeForAll::{0}", System.DateTime.Now.Second);
            await LongRunningAsyncOperationAwaited(id);
            System.Console.WriteLine("1b::JfdiFreeForAll::{0}", System.DateTime.Now.Second);
            await LongRunningAsyncOperation(id);
            System.Console.WriteLine("\t============Beginning Unawaited Portion============");
            System.Console.WriteLine("1c::JfdiFreeForAll::Not Awaited::{0}", System.DateTime.Now.Second);
            LongRunningAsyncOperationAwaited(id);
            System.Console.WriteLine("1d::JfdiFreeForAll::Not Awaited::{0}", System.DateTime.Now.Second);
            LongRunningAsyncOperation(id);
            System.Console.WriteLine("1e::JfdiFreeForAll::{0}", System.DateTime.Now.Second);
        }

        public async Task LongRunningAsyncOperationAwaited(string id)
        {
            System.Console.WriteLine("2in\t{1}\t{0}", System.DateTime.Now.Second, id);
            await Task.Delay(6000);
            System.Console.WriteLine("2out\t{1}\t{0}", System.DateTime.Now.Second, id);
        }

        public async Task LongRunningAsyncOperation(string id)
        {
            System.Console.WriteLine("3in\t{1}\t{0}", System.DateTime.Now.Second, id);
            Task task = Task.Delay(4000);
            System.Console.WriteLine("3work\t{1}\t{0}", System.DateTime.Now.Second, id);
            await task;
            System.Console.WriteLine("3out\t{1}\t{0}", System.DateTime.Now.Second, id);
        }

    }
} 
