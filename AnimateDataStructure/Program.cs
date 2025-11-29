using AnimateDataStructure.Application.Services.DataStructuresListService;
using AnimateDataStructure.Application.Services.LoadingService;
using AnimateDataStructure.Application.Services.NodesFormattingService;
using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Core.Entities.CardEntities;
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
using AnimateDataStructure.Infrastructure.Identity;
using AnimateDataStructure.Infrastructure.Repositories.GenericRepository;
using AnimateDataStructure.Infrastructure.Repositories.HistoryRepository;
using Serilog;

// SERILOG BOOTSTRAPPING (MUST OCCUR BEFORE builder.Build())
var builder = WebApplication.CreateBuilder(args);

// Configure Serilog to read settings from appsettings.json
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();

builder.Host.UseSerilog();
builder.Services.Configure<DataStructureListOptions>(builder.Configuration.GetSection(DataStructureListOptions.SectionName));
builder.Services.AddScoped<IDataStructureListService, DataStructureListService>();

builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>(); // Add custom Authentication Service
builder.Services.AddScoped<ITreeControllerLogger, TreeControllerLogger>(); // Custom logging service

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

builder.Services.AddTransient<INodeValueParser, AvlTreeNodeParser>(); // Select only ONE of them

builder.Services.AddTransient<IBaseTreeTranslator<BinarySearchTree, SaveBinarySearchTreeDto, NodeBinarySearchTree>, BinarySearchTreeTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<AvlTree, SaveAvlTreeDto, NodeAvlTree>, AvlTreeTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<MinHeap, SaveMinHeapDto, NodeMinHeap>, MinHeapTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<MaxHeap, SaveMaxHeapDto, NodeMaxHeap>, MaxHeapTranslator>();
builder.Services.AddTransient<IBaseTreeTranslator<RedBlackTree, SaveRedBlackTreeDto, NodeRedBlackTree>, RedBlackTreeTranslator>();

builder.Services.AddScoped<INodeValueUniquenessValidator, NodeValueUniquenessValidator>();

// These are used by the BaseTreeService to create the concrete validators at runtime
builder.Services.AddScoped<ITreeValidatorProvider<NodeAvlTree>, AvlTreeValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeBinarySearchTree>, BinarySearchTreeValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeMinHeap>, MinHeapValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeMaxHeap>, MaxHeapValidatorProvider>();
builder.Services.AddScoped<ITreeValidatorProvider<NodeRedBlackTree>, RedBlackTreeValidatorProvider>();

// Register all Formatters for BST, AVL, MinHeap, MaxHeap
builder.Services.AddScoped(typeof(IDataStructureFormatter<NodeAvlTree>), typeof(CommonTreeNodeFormatter<NodeAvlTree>));
builder.Services.AddScoped(typeof(IDataStructureFormatter<NodeBinarySearchTree>), typeof(CommonTreeNodeFormatter<NodeBinarySearchTree>));
builder.Services.AddScoped(typeof(IDataStructureFormatter<NodeMinHeap>), typeof(CommonTreeNodeFormatter<NodeMinHeap>));
builder.Services.AddScoped(typeof(IDataStructureFormatter<NodeMaxHeap>), typeof(CommonTreeNodeFormatter<NodeMaxHeap>));
builder.Services.AddScoped<IDataStructureFormatter<NodeRedBlackTree>, RedBlackTreeFormatter>();

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IDataLoader<,>), typeof(DataStructureDataLoader<,>));

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

// Configure the cookies based on environment
builder.Services.ConfigureIdentityCookies(builder.Environment);

// Add services to the container
builder.Services.AddControllersWithViews();

// Register the IAntiforgery service 
builder.Services.AddAntiforgery(options =>
{
});

var app = builder.Build();

// 2. REGISTER SERILOG FLUSHING ON APP STOP

// Ensures that any buffered logs (especially for file writing) are written out before the application process fully terminates
app.Lifetime.ApplicationStopped.Register(Log.CloseAndFlush);

// Configure the HTTP request pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();
app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=DataStructures}/{action=ShowListDataStructures}/{id?}")
    .WithStaticAssets();

app.Run();