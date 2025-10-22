using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities;
using AnimateDataStructure.Core.Entities.DataStructureEntities;
using AnimateDataStructure.Core.Entities.NodeEntities;
using AnimateDataStructure.Core.Interfaces;
using AnimateDataStructure.Core.Parsers;
using AnimateDataStructure.Core.Services.AuthenticationService;
using AnimateDataStructure.Core.Services.HistoryService;
using AnimateDataStructure.Core.Services.LoggingService;
using AnimateDataStructure.Core.Services.NodesValidationService;
using AnimateDataStructure.Core.Services.TreeServices;
using AnimateDataStructure.Core.Services.TreeStructureValidationService.TreeValidationProvider;
using AnimateDataStructure.Core.Translators;
using AnimateDataStructure.Infrastructure.Data;
using AnimateDataStructure.Infrastructure.Identity;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;
using AnimateDataStructure.Infrastructure.Repositories.HistoryRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;


// SERILOG BOOTSTRAPPING (MUST OCCUR BEFORE builder.Build())

// Create the builder object
var builder = WebApplication.CreateBuilder(args);

// Configure Serilog to read settings from appsettings.json
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

// Tell the application host to use Serilog for logging (THIS IS THE REPLACEMENT)
// REPLACE: The default logging setup is replaced by this line which uses Serilog.
builder.Host.UseSerilog();


builder.Services.AddIdentityServices(builder.Configuration);

// Add custom Authentication Service
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();


// Custom logging service
builder.Services.AddScoped<ITreeControllerLogger, TreeControllerLogger>();


builder.Services.AddTransient<AvlTreeNodeParser>();
builder.Services.AddTransient<BinarySearchTreeParser>();
builder.Services.AddTransient<MinHeapNodeParser>();
builder.Services.AddTransient<MaxHeapNodeParser>();
builder.Services.AddTransient<RedBlackTreeNodeParser>();


builder.Services.AddTransient<IBaseNodeParser<NodeBinarySearchTree>, BinarySearchTreeParser>();
builder.Services.AddTransient<IBaseNodeParser<NodeAvlTree>, AvlTreeNodeParser>();
builder.Services.AddTransient<IBaseNodeParser<NodeMinHeap>, MinHeapNodeParser>();
builder.Services.AddTransient<IBaseNodeParser<NodeMaxHeap>, MaxHeapNodeParser>();
builder.Services.AddTransient<IBaseNodeParser<NodeRedBlackTree>, RedBlackTreeNodeParser>();


builder.Services.AddTransient<INodeValueParser, AvlTreeNodeParser>(); // DO NOT DELETE: Select only ONE of them


builder.Services.AddTransient<IBaseTreeTranslator<BinarySearchTree, SaveBinarySearchTreeDto, NodeBinarySearchTree>, BinarySearchTreeTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<AvlTree, SaveAvlTreeDto, NodeAvlTree>, AvlTreeTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<MinHeap, SaveMinHeapDto, NodeMinHeap>, MinHeapTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<MaxHeap, SaveMaxHeapDto, NodeMaxHeap>, MaxHeapTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree>, RedBlackTreeTranslator>();


// Register the validators
builder.Services.AddScoped<INodeValueUniquenessValidator, NodeValueUniquenessValidator>();

//builder.Services.AddTransient<AvlTreeValidator>();
//builder.Services.AddTransient<BinarySearchTreeValidator>();
//builder.Services.AddTransient<MinHeapValidator>();
//builder.Services.AddTransient<MaxHeapValidator>();
//builder.Services.AddTransient<RedBlackTreeValidator>();


// These are used by the BaseTreeService to create the concrete validators at runtime
builder.Services.AddScoped<ITreeValidatorProvider<NodeAvlTree>, AvlTreeValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeBinarySearchTree>, BinarySearchTreeValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeMinHeap>, MinHeapValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeMaxHeap>, MaxHeapValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeRedBlackTree>, RedBlackTreeValidatorProvider>();


builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));


// Register the services with their dependencies
builder.Services.AddScoped<BinarySearchTreeService>();
builder.Services.AddScoped<AvlTreeService>();
builder.Services.AddScoped<MinHeapService>();
builder.Services.AddScoped<MaxHeapService>();
builder.Services.AddScoped<RedBlackTreeService>();


builder.Services.AddScoped<IHistoryQueryRepository, HistoryQueryRepository>();
builder.Services.AddScoped<IHistoryService, HistoryService>();


builder.Services.AddScoped<IBaseTreeService<SaveBinarySearchTreeDto>, BinarySearchTreeService>();
builder.Services.AddScoped<IBaseTreeService<SaveAvlTreeDto>, AvlTreeService>();
builder.Services.AddScoped<IBaseTreeService<SaveMinHeapDto>, MinHeapService>();
builder.Services.AddScoped<IBaseTreeService<SaveMaxHeapDto>, MaxHeapService>();
builder.Services.AddScoped<IBaseTreeService<SaveRedBlackTreeDto>, RedBlackTreeService>();




// 3. Configure applicatuin Cookie
//builder.Services.ConfigureApplicationCookie(options =>
//{
//    //options.LoginPath = "/Account/Login";
//    options.AccessDeniedPath = "/Account/AccessDenied"; // TO IMPLEMENT!!!!
//});

// Now call the new extension method to configure the cookies based on environment.
builder.Services.ConfigureIdentityCookies(builder.Environment);


// Add services to the container.
builder.Services.AddControllersWithViews();


//???
// Register the IAntiforgery service 
builder.Services.AddAntiforgery(options =>
{
    // configure options here if needed, (to set a custom cookie name)
});


var app = builder.Build();


// -----------------------------------------------------------------------------------
// 2. REGISTER SERILOG FLUSHING ON APP STOP
// -----------------------------------------------------------------------------------

// Ensures that any buffered logs (especially for file writing) are written out before the application process fully terminates
app.Lifetime.ApplicationStopped.Register(Log.CloseAndFlush);


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();


// ????
// For anti-forgery to work. It sets and validates the token.
//app.UseAntiforgery();


app.UseAuthentication(); // first+++++++++++++
app.UseAuthorization(); // second+++++++++++++
// For anti-forgery to work. It sets and validates the token.
app.UseAntiforgery();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=DataStructures}/{action=ShowListDataStructures}/{id?}")
    .WithStaticAssets();

app.Run();
