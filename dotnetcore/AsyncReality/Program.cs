using System;

namespace AsyncReality
{
    class Program
    {
        static void Main(string[] args)
        {
            string demoIndex = string.Empty;
            if (args.Length > 0)
            {
                demoIndex = args[0].ToLower();
            }
            Console.WriteLine("\n***************************************");
            Console.WriteLine("Demonstrating Async/Await");
            Console.WriteLine("This demo is based on the information in the following article:");
            Console.WriteLine("\thttps://www.codeproject.com/Articles/1229574/Addressing-a-simple-yet-common-Csharp-Async-Await");
            Service svc = new Service();
            switch (demoIndex)
            {
                case "a":
                    Console.WriteLine("\nRunning demo 'a': Single Call, Awaiting");
                    svc.Jfdi(demoIndex);
                break;
                case "2":
                    Console.WriteLine("\nRunning demo '2': Multiple Calls, Awaiting");
                    for(var i = 0; i < 3; i++)
                    {
                        Console.WriteLine("\n\t\tBeggar's Canyon...");
                        svc.Jfdi(GenerateId(i));
                    }
                    Console.ReadLine();
                break;
                case "iii":
                    Console.WriteLine("\nRunning demo 'iii': Multiple Calls, NOT Awaiting");
                    Console.WriteLine("\t(NOTE: You must press <enter> when the demo finishes which takes approximately 30 seconds)");
                    for(var i = 0; i < 3; i++)
                    {
                        Console.WriteLine("\n\t\tBeggar's Canyon...");
                        svc.JfdiFreeForAll(GenerateId(i));
                    }
                    Console.ReadLine();
                break;
                default:
                    Console.WriteLine("Choose a, 2, iii and try again.");
                break;
            }
        }

        static string GenerateId(int index)
        {
            string result = string.Empty;
            for(var i = 0; i <= index; i++)
            {
                result += "X";
            }
            return result;
        }
    }
}
